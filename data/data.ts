//if a name consists of more than one word, separate them with an underscore
export const chapters = [
  {
    name: 'elektronika',
    image: 'https://i.postimg.cc/y8yYNN95/zaba.jpg',
    des: 'Większość informacji z tego rozdziału wziąłem <a href="https://mega.nz/folder/MN0FRDqT#E07ZRcEyDT8d-hi58KpdDg/folder/lcdE3DDS">stąd</a> i <a href="https://wieik.ovh/dokuph_8.html">stąd</a>. Te źródła nie są moje, więc jak coś jest źle to pretensje nie do mnie.',
  },
  {
    name: 'elektrotechnika',
    image: 'https://i.postimg.cc/Xv0Xm9DV/chrab-szcz.png',
    des: 'tak, na okładce to Chrabąszcz',
  },
  // {
  //   name: 'mp',
  //   image: 'https://i.postimg.cc/cJjqYrV8/image.png',
  // },
]
//also id of questions should go like "cat_1|top_1|1"
//main keys must be exact the same as names of categories
export const topics = {
  elektronika: [
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
  mp:[
    {
      name: 'złożoność',
      image: ''
    },
    {
      name: 'rekurencja',
      image: ''
    },
    {
      name: 'liczby_losowe',
      image: ''
    },
    {
      name: 'alg._plecakowy',
      image: ''
    },
    {
      name: 'alg._huffmanna',
      image: ''
    },
  ]
}
