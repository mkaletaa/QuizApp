import os
import shutil
import sys

# Pobranie argumentów z wiersza poleceń
args = sys.argv[1:]

# Sprawdzenie, czy użytkownik podał poprawnie argumenty
if len(args) != 2:
    print('Usage: python switch.py <module you want to export> <module you want to import>')
    sys.exit(1)

# Pobranie nazwy folderu, do którego mają zostać przeniesione (wyeksportowane) zasoby
expArg = args[0]

# Pobranie nazwy folderu, z którego mają zostać wyciągnięte (zaimportowane) zasoby
impArg = args[1]

# Ścieżka do folderu ./data
exp_source_path = './data'

# Ścieżka do folderu źródłowego (./_modules/impArg)
imp_source_path = f'./_modules/{impArg}'

# Ścieżka do folderu docelowego (./_modules/expArg)
exp_destination_path = f'./_modules/{expArg}'

# Ścieżka do folderu docelowego (./data)
imp_destination_path = './data'

# Sprawdzenie, czy folder ./data istnieje
if not os.path.exists(exp_source_path):
    print('Folder ./data does not exist')
    sys.exit(1)

# Sprawdzenie, czy folder docelowy (./_modules/expArg) istnieje
if not os.path.exists(exp_destination_path):
    print(f'Folder ./_modules/{expArg} does not exist')
    sys.exit(1)

# Sprawdzenie, czy folder docelowy zawiera już podfolder 'data'
data_folder_path = os.path.join(exp_destination_path, 'data')
if os.path.exists(data_folder_path):
    print(f'The destination folder already contains a data subfolder')
    sys.exit(1)

# Sprawdzenie, czy folder ./_modules/<impArg> istnieje
if not os.path.exists(imp_source_path):
    print(f'Folder ./_modules/{impArg} does not exist')
    sys.exit(1)


#*############################### moving folders #################################

try:
    # Przeniesienie folderu ./data do folderu docelowego
    shutil.move(exp_source_path, os.path.join(exp_destination_path, 'data'))
    print('Folder ./data exported successfully')
except Exception as err:
    print('Error moving folder:', err)
    sys.exit(1)

try:
    # Przeniesienie folderu ./_modules/<impArg>/data do folderu docelowego
    shutil.move(os.path.join(imp_source_path, 'data'), imp_destination_path)
    print('Folder data from ./_modules imported successfully')
except Exception as err:
    print('Error moving folder:', err)

    sys.exit(1)




