const fs = require('fs')
const path = require('path')

// Pobranie argumentów z wiersza poleceń
const args = process.argv.slice(2)
console.log("🚀 ~ args:", args)

// Sprawdzenie, czy użytkownik podał argumenty
if (args.length !== 2) {
  console.error(
    'Usage: node switch <module you want to export> <module you want to import>'
  )
  process.exit(1)
}

// Pobranie nazwy folderu, do którego mają zostać przeniesione zasoby
const arg1 = args[0]

// Ścieżka do folderu ./data
const sourcePath = './data'

// Ścieżka do folderu docelowego (./_modules/arg1)
const destinationPath = `./_modules/${arg1}`

console.log("🚀 ~ destinationPath:", destinationPath)
// Sprawdzenie, czy folder ./data istnieje
if (!fs.existsSync(sourcePath)) {
  console.error('Folder ./data does not exist')
  process.exit(1)
}

// Sprawdzenie, czy folder docelowy (./_modules/arg1) istnieje
if (!fs.existsSync(destinationPath)) {
  console.error(`Folder ./_modules/${arg1} does not exist`)
  process.exit(1)
}

try {
  // Przeniesienie folderu ./data do folderu docelowego
  fs.renameSync(sourcePath, path.join(destinationPath, 'data'))
  console.log('Folder ./data moved successfully')
} catch (err) {
  console.error('Error moving folder:', err)
  process.exit(1)
}

//* importowanie nowego folderu

// Pobranie nazwy folderu, z którego mają zostać wyciągnięte zasoby
const arg2 = args[1]

// Ścieżka do folderu źródłowego (./_modules/arg2)
const sourcePath2 = `./_modules/${arg2}`

// Ścieżka do folderu docelowego (./data)
const destinationPath2 = './data'

// Sprawdzenie, czy folder ./_modules/<arg2> istnieje
if (!fs.existsSync(sourcePath2)) {
  console.error(`Folder ./_modules/${arg2} does not exist`)
  process.exit(1)
}

try {
  // Przeniesienie folderu ./_modules/<arg2>/data do folderu docelowego
  fs.renameSync(path.join(sourcePath2, 'data'), destinationPath2)
  console.log('Folder data from ./_modules moved successfully')
} catch (err) {
  console.error('Error moving folder:', err)
  process.exit(1)
}
