//if a name consists of more than one word, separate them with an underscore
export const chapters = [
  {
    name: 'C',
    image: 'https://i.postimg.cc/zvkLpPFP/cpp.png',
  },
  {
    name: 'elektronika',
    image: 'https://i.postimg.cc/y8yYNN95/zaba.jpg',
    des: 'Jeśli myślisz, że będzie źle, to będzie gorzej. Ten przedmiot to jakiś ewenement, bo kolokwia są fajniejsze niż ćwiczenia. Nie dość, że wychodzisz wcześniej, to jeszcze nie musisz słuchać darcia mordy. Ale nie bój żaby, dzięki mnie zdasz śpiewająco na 3. <br></br> Większość informacji z tego rozdziału wziąłem <a href="https://mega.nz/folder/MN0FRDqT#E07ZRcEyDT8d-hi58KpdDg/folder/lcdE3DDS">stąd</a> i <a href="https://wieik.ovh/dokuph_8.html">stąd</a>. Nie są moje. Zdarzają się w nich błędy, więc jak coś to lepiej uczyć się z aplikacji niż z nich. No i zwracaj największą uwagę na schematy.',
  },
  {
    name: 'elektrotechnika',
    image: 'https://i.postimg.cc/Xv0Xm9DV/chrab-szcz.png',
    des: 'Jeśli chodzi o laboratoria, to z Prusakiem zdasz z palcem wiadomo gdzie, a z Chrabąszczem choćbyś przepisał słowo w słowo jego notatki to i tak nie dostaniesz 5 (nie żartuję). Gość potrafi uwalić cię za jedno źle użyte słowo (tutaj też nie żartuję). Na szczęście we wszystkich grupach i na wszystkich termianch pytania były te same. <br></br>Jeśli chodzi o ćwiczenia, to na początku pyta kilka osób, ale bez spiny, to nie żabulec. Kolokwia z ćwiczeń już nie sprawdza tak surowo. <br></br>Tak, na okładce to Chrabąszcz',
  },
  // {
  //   name: 'metody_programowania',
  //   image: 'https://i.postimg.cc/cJjqYrV8/image.png',
  // },
  {
    name: 'VHDL',
    image: 'https://i.postimg.cc/cJjqYrV8/image.png',
    des: 'Nie będzie tu dużo, bo przedmiot łatwy do zdania, ale lepiej zaliczyć w pierwszym terminie niż drugim. Król złoty wręcz zachęca do brania kodu z neta. Ciekawostka: zdałem ten przedmoit bez napisania ani jednej linijki kodu samodzielnie. Zawsze była kopiuj-wklejka albo bezmyślne przpisywanie. Radziłbym tylko uważać, bo Aldec jest trojanem <a href="https://i.postimg.cc/qBQgMGrJ/image.png">XDD</a>',
  },
]
//also id of questions should go like "cat_1|top_1|1"
//main keys must be exact the same as names of categories
export const topics = {
  C: [
    {
      name: 'egzamin',
      image: 'https://i.postimg.cc/zvkLpPFP/cpp.png',
    },
  ],
  elektronika: [
    {
      name: 'wzmacniacz_tranzystorowy',
      image: 'https://i.postimg.cc/jdYvFSMz/image.png',
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
  ],
  // metody_programowania: [
  //   {
  //     name: 'złożoność_obliczeniowa',
  //     image: '',
  //   },
  //   {
  //     name: 'rekurencja',
  //     image: '',
  //   },
  //   {
  //     name: 'liczby_losowe',
  //     image: '',
  //   },
  //   {
  //     name: 'alg._plecakowy',
  //     image: '',
  //   },
  //   {
  //     name: 'alg._huffmanna',
  //     image: '',
  //   },
  // ],
  VHDL:[
    {
      name: 'kolos',
      image: ''
    }
  ]
}
