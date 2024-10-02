//if a name consists of more than one word, separate them with an underscore
export const chapters = [
  {
    name: 'C++',
    image: 'https://i.postimg.cc/zvkLpPFP/cpp.png',
    des: '',
  },
  {
    name: 'analiza',
    image: 'https://i.postimg.cc/yYL8FRrd/analiza.png',
    des: 'Znajduje się tu tylko analiza, bo algebry mi się już nie chciało dodawać xD. Ale jak coś to okrutnie polecam <a href="https://www.youtube.com/watch?v=qoaaCboDWR8&list=PLl2G2wgLAhWA5pRMSfPd9ISEaqOGQoHtk">tę playlistę</a> o macierzach. Gość tłumaczy lepiej niż Piękosz.',
  },
  {
    name: 'elektronika',
    image: 'https://i.postimg.cc/y8yYNN95/zaba.jpg',
    des: 'Jeśli myślisz, że będzie źle, jesteś w błędzie. Będzie gorzej. Ale nie bój żaby, dzięki mnie zdasz śpiewająco na 3. <br></br> Większość informacji z wziąłem <a href="https://mega.nz/folder/MN0FRDqT#E07ZRcEyDT8d-hi58KpdDg/folder/lcdE3DDS">stąd</a> i <a href="https://wieik.ovh/dokuph_8.html">stąd</a>. Nie są moje. Zdarzają się w nich błędy, więc jak coś to lepiej uczyć się z aplikacji niż z nich. No i zwracaj największą uwagę na schematy.',
  },
  {
    name: 'elektrotechnika',
    image: 'https://i.postimg.cc/VLh5xM9h/elektrotechnika.png',
    des: '',
  },
  {
    name: 'metody_programowania',
    image: 'https://i.postimg.cc/Tw7KJYG8/MP.png',
    des: 'Tego przedmiotu miało tu nie być, ale że Kokos wyciąga te zadania z dupy jelenia uznałem, że przyda się je omówić. Na szczęście często się powtarzają. I nie ma quizów, bo miałem ważniejszą sprawę na głowie.',
  },
  // {
  //   name: 'VHDL',
  //   image: 'https://i.postimg.cc/cJjqYrV8/image.png',
  //   des: 'Nie będzie tu dużo, bo przedmiot łatwy do zdania, ale lepiej zaliczyć w pierwszym terminie niż drugim. Król złoty wręcz zachęca do brania kodu z neta. Ciekawostka: zdałem ten przedmoit bez napisania ani jednej linijki kodu samodzielnie. Zawsze była kopiuj-wklejka albo bezmyślne przpisywanie. Radziłbym tylko uważać, bo Aldec jest trojanem <a href="https://i.postimg.cc/qBQgMGrJ/image.png">XDD</a>',
  // },
]
//also id of questions should go like "cat_1|top_1|1"
//main keys must be exact the same as names of categories
export const topics = {
  ['C++']: [
    {
      name: 'egzamin_#1',
      image: 'https://i.postimg.cc/zvkLpPFP/cpp.png',
    },
    {
      name: 'egzamin_#2',
      image: 'https://i.postimg.cc/zvkLpPFP/cpp.png',
    },
  ],
  analiza: [
    {
      name: 'egzamin_teoria',
      image: 'https://i.postimg.cc/nVDqwG1t/image.png',
    },
    {
      name: 'granice',
      image: 'https://i.postimg.cc/3NYr1hBN/image.png',
    },
    {
      name: 'pochodne',
      image: 'https://i.postimg.cc/yN4McPnY/image.png',
    },
    {
      name: 'całki',
      image: 'https://i.postimg.cc/c1rF13MD/image.png',
    },
    {
      name: 'pozostałe',
      image: 'https://i.postimg.cc/TwhJw8my/image.png',
    },
  ],
  elektronika: [
    {
      name: 'wzmacniacz_tranzystorowy',
      image: 'https://i.postimg.cc/fyPzNdst/image.png',
    },
    {
      name: 'wzmacniacz_operacyjny',
      image: 'https://i.postimg.cc/jdYvFSMz/image.png',
    },
    {
      name: '_555',
      image: 'https://i.postimg.cc/pVhyRRdQ/image.png',
    },
    {
      name: 'układy_logiczne',
      image: 'https://i.postimg.cc/G296NvDk/bool.png',
    },
    {
      name: 'konwertery_kodów',
      image: 'https://i.postimg.cc/bvypSgLH/image.png',
    },
    {
      name: 'liczniki',
      image: 'https://i.postimg.cc/CL23BZkT/image.png',
    },
  ],
  elektrotechnika: [
    {
      name: 'teoria',
      image: 'https://i.postimg.cc/t4NXM80g/image.png',
    },
    {
      name: 'kondensatory',
      image: 'https://i.postimg.cc/bNshjDQt/image.png',
    },
    {
      name: 'oporniki',
      image: 'https://i.postimg.cc/Xq7SDXgQ/image.png',
    },
    {
      name: 'obwody',
      image: 'https://i.postimg.cc/JzwsckNR/image.png',
    },
    {
      name: 'RLC',
      image: 'https://i.postimg.cc/9Q8N13XP/rlc.png',
    },
    {
      name: 'egzamin',
      image: 'https://i.postimg.cc/tTMQZHM8/image.png',
    },
  ],
  metody_programowania: [
    {
      name: 'egzaminy',
      image: 'https://i.postimg.cc/3wMSK5QK/image.png',
    },
    {
      name: 'złożoność_obliczeniowa',
      image: 'https://i.postimg.cc/3xjpDPDr/omeag.png',
    },
    {
      name: 'rekurencja',
      image: 'https://i.postimg.cc/ncJH0Pg9/image.png',
    },
    {
      name: 'liczby_losowe',
      image: 'https://i.postimg.cc/X7M2b6fQ/image.png',
    },
    {
      name: 'plecakowy',
      image: 'https://i.postimg.cc/hPbLhNVS/image.png',
    },
    {
      name: 'grafy',
      image: 'https://i.postimg.cc/qMmGcH6L/image.png',
    },
    {
      name: 'huffman',
      image: 'https://i.postimg.cc/rsf595sm/image.png',
    },
    {
      name: 'kombinatoryka',
      image: ''
    },
    {
      name: 'pozostałe #1',
      image: '',
    },
    {
      name: 'pozostałe #2',
      image: '',
    },
  ],
  // VHDL: [
  //   {
  //     name: 'kolos',
  //     image: '',
  //   },
  // ],
}
