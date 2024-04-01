import os
import shutil
import sys
import argparse

# Analiza argumentów wiersza poleceń
parser = argparse.ArgumentParser(description='CLI for exporting and importing data folders')
parser.add_argument('export_module', metavar='export_module', type=str,
                    help='Module you want to export')
parser.add_argument('import_module', metavar='import_module', type=str,
                    help='Module you want to import')
parser.add_argument('--lang', dest='language', choices=['pl', 'en'],
                    help='Language flag: pl or en')
args = parser.parse_args()

expArg = args.export_module
impArg = args.import_module
language = args.language

# Ścieżki folderów
exp_source_path = './data'
exp_destination_path = f'./_modules/{expArg}'
imp_source_path = f'./_modules/{impArg}'
imp_destination_path = './data'

# Sprawdzenie istnienia folderów
if not os.path.exists(exp_source_path):
    print('Folder ./data does not exist')
    sys.exit(1)

if not os.path.exists(exp_destination_path):
    print(f'Folder ./_modules/{expArg} does not exist')
    sys.exit(1)

data_folder_path = os.path.join(exp_destination_path, 'data')
if os.path.exists(data_folder_path):
    print(f'The destination folder already contains a data subfolder')
    sys.exit(1)

if not os.path.exists(imp_source_path):
    print(f'Folder ./_modules/{impArg} does not exist')
    sys.exit(1)

# Przeniesienie folderów
try:
    shutil.move(exp_source_path, os.path.join(exp_destination_path, 'data'))
    print('Folder ./data exported successfully to', exp_destination_path)
except Exception as err:
    print('Error exporting folder:', err)
    sys.exit(1)

try:
    shutil.move(os.path.join(imp_source_path, 'data'), imp_destination_path)
    print('Folder data from ./_modules/',imp_source_path,' imported successfully')
except Exception as err:
    print('Error importing folder:', err)
    sys.exit(1)

# Kopiowanie pliku tekstowego w zależności od wartości flagi --lang
if language:
    texts_source_path = f'./_modules/texts-{language}.js'
    texts_destination_path = './data/texts.js'
    try:
        shutil.copyfile(texts_source_path, texts_destination_path)
        print(f'Texts file copied successfully for language: {language}')
    except FileNotFoundError:
        print(f'Texts file for language {language} does not exist')
        sys.exit(1)
