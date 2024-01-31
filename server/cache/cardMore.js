const chanceCard = [
  {
    id: 1,
    text: " Tahniah! Anda telah memenangi pertandingan inovasi kimia.",
    note: " Sila ambil RM10 daripada pembantu makmal.",
    save: false,
    move: 0,
    cash: 10,
  },
  {
    id: 2,
    text: " Keluar daripada bilik peperiksaan",
    note: " Kad ini boleh disimpan sehingga diperlukan atau dijual. ",
    save: true,
    move: 0,
    cash: 0,
  },
];

const penaltyCard = [
  {
    id: 1,
    text: "Anda tidak memakai labcoat semasa menjalankan eksperimen. ",
    note: "Nota: Sila bayar denda RM5 kepada pembantu makmal. ",
    save: false,
    move: 0,
    cash: -5,
    start: false,
  },
  {
    id: 2,
    text: "Undur 2 tapak kebelakang",
    note: "",
    save: false,
    move: -2,
    cash: 0,
    start: false,
  },
  {
    id: 3,
    text: "Anda didapati melakukan penipuan semasa permainan berlangsung.",
    note: "Nota: Sila kembali ke tapak MULA",
    save: false,
    move: 0,
    cash: 0,
    start: true,
  },
];

const noteCard = [
  {
    id: 1,
    image: null,
    text: "Semua garam sulfat larut dalam air pada suhu bilik kecuali plumbum (II) sulfat",
  },
  {
    id: 2,
    image: null,
    text: "Hablur garam dikeringkan antara dua keping kertas turas.",
  },
];

export default function getCard() {
  return {
    chance: chanceCard,
    penalty: penaltyCard,
    note: noteCard,
  };
}
