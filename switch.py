import os
import shutil
import sys
import argparse
import json

# Analiza argumentów wiersza poleceń
parser = argparse.ArgumentParser(description='CLI for exporting and importing data folders')
parser.add_argument('export_module', metavar='export_module', type=str, nargs='?',
                    help='Module you want to export')
parser.add_argument('import_module', metavar='import_module', type=str, nargs='?',
                    help='Module you want to import')
args = parser.parse_args()

expArg = args.export_module
print("🚀 ~ expArg:", expArg)
impArg = args.import_module

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


#*################ Przenoszenie folderów #################

try:
    shutil.move(exp_source_path, os.path.join(exp_destination_path, 'data'))
    print('Folder ./data exported successfully to', exp_destination_path)
except Exception as err:
    print('Error exporting folder:', err)
    sys.exit(1)

try:
    shutil.move(os.path.join(imp_source_path, 'data'), imp_destination_path)
    print('Folder data from',imp_source_path,' imported successfully')
except Exception as err:
    print('Error importing folder:', err)
    sys.exit(1)

# Wczytywanie ustawień języka z pliku settings.json
settings_path = './data/settings.json'
# Ścieżka do pliku package.json
package_path = './app.json'

if os.path.exists(settings_path):
    with open(settings_path, 'r') as settings_file:
        settings = json.load(settings_file)
        lang = settings.get('lang')

        # Kopiowanie pliku tekstowego w zależności od ustawień języka
        if lang:
            texts_source_path = f'./_modules/texts-{lang}.js'
            texts_destination_path = './data/texts.js'
            try:
                shutil.copyfile(texts_source_path, texts_destination_path)
                print(f'Texts file copied successfully for lang: {lang}')
            except FileNotFoundError:
                print(f'Texts file for lang {lang} does not exist')
                # sys.exit(1)

        # Pobranie wartości klucza name z pliku settings.json
        name = settings.get('name')
        if False:
            # Wczytanie zawartości pliku package.json
            with open(package_path, 'r') as package_file:
                package_data = json.load(package_file)
                
                # Aktualizacja wartości klucza name w pliku package.json
                package_data['name'] = name
                
                # Zapisanie zmian w pliku package.json
                with open(package_path, 'w') as package_file_updated:
                    json.dump(package_data, package_file_updated, indent=4)
                
                print('Value of "name" key from settings.json successfully copied to package.json')
        else:
            print('Key "name" not found in settings.json')

else:
    print('File settings.json does not exist')
    sys.exit(1)
