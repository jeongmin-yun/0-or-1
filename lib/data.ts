export type PredictionType = "binary" | "multiple";
export const matches = [
  {
    id: 1,

    type: "binary",

    title: "엘링 홀란 오늘 득점할까?",

    league: "EPL",

    category: "축구",

    yes: 63,

    no: 37,

    people: 12381,

    description: "맨체스터시티 vs 아스널",

    player: {
      name: "엘링 홀란",
      team: "맨체스터시티",
      position: "FW",
      marketValue: "1700억",
      goals: 8,
      assists: 3,
      averageRating: 8.1,
    },

    report: {
      probability: 71,

      confidence: 82,

      recommendation: "YES",

      history: [48, 52, 55, 58, 61, 63],

      recentGoals: 8,

      averageRating: 8.1,

      reasons: [
        "최근 10경기 8골",
        "최근 평점 8.1",
        "상대팀 핵심 수비수 결장",
        "선발 출전 예상",
      ],

      news: [
        "엘링 홀란 최근 3경기 연속 공격포인트",
        "맨체스터시티 공격진 전원 출전 예상",
      ],

      sentiment: {
        positive: 72,
        negative: 28,
      },
    },
  },

  {
    id: 2,

    type: "binary",

    title: "맨체스터 시티 승리?",

    league: "EPL",

    category: "축구",

    yes: 71,

    no: 29,

    people: 8322,

    description: "맨시티 vs 첼시",

    player: {
      name: "엘링 홀란",
      team: "맨체스터 시티",
      position: "FW",
      marketValue: "2,600억",
      goals: 9,
      assists: 2,
      averageRating: 9.0,
    },

    report: {
      probability: 79,

      confidence: 88,

      recommendation: "YES",

      history: [48, 52, 55, 58, 61, 63],

      recentGoals: 9,

      averageRating: 9.0,

      reasons: [
        "최근 득점력 최고 수준",
        "홈 경기",
        "최근 5경기 7골",
      ],

      news: [
        "맨시티 홈 8연승",
        "홀란 컨디션 최고",
      ],

      sentiment: {
        positive: 81,
        negative: 19,
      },
    },
  },

  {
    id: 3,

    type: "binary",

    title: "LG 트윈스 승리?",

    league: "KBO",

    category: "야구",

    yes: 58,

    no: 42,

    people: 5122,

    description: "LG vs KIA",

    player: {
      name: "오스틴 딘",
      team: "LG 트윈스",
      position: "1루수",
      marketValue: "40억",
      goals: 0,
      assists: 0,
      averageRating: 7.6,
    },

    report: {
      probability: 64,

      confidence: 74,

      recommendation: "YES",

      history: [48, 52, 55, 58, 61, 63],

      recentGoals: 0,

      averageRating: 7.6,

      reasons: [
        "최근 팀 타율 상승",
        "선발투수 우세",
      ],

      news: [
        "LG 최근 5경기 4승",
        "KIA 핵심타자 결장",
      ],

      sentiment: {
        positive: 61,
        negative: 39,
      },
    },
  },

  {
    id: 4,

    type: "binary",

    title: "T1 MSI 우승?",

    league: "LCK",

    category: "e스포츠",

    yes: 81,

    no: 19,

    people: 15322,

    description: "MSI 2026",

    player: {
      name: "Faker",
      team: "T1",
      position: "MID",
      marketValue: "-",
      goals: 0,
      assists: 0,
      averageRating: 9.7,
    },

    report: {
      probability: 88,

      confidence: 93,

      recommendation: "YES",

      history: [48, 52, 55, 58, 61, 63],

      recentGoals: 0,

      averageRating: 9.7,

      reasons: [
        "최근 국제대회 강세",
        "팀 호흡 최고",
      ],

      news: [
        "T1 MSI 우승 후보 1순위",
        "Faker 최근 MVP 선정",
      ],

      sentiment: {
        positive: 90,
        negative: 10,
      },
    },
  },

  {
  id: 999,

  type: "multiple",

  title: "2026 월드컵 우승국은?",

  description: "FIFA World Cup",

  people: 23561,

  category: "축구",

  options: [
    {
      id: 1,
      name: "잉글랜드",
      percent: 15,
    },
    {
      id: 2,
      name: "프랑스",
      percent: 25,
    },
    {
      id: 3,
      name: "노르웨이",
      percent: 18,
    },
    {
      id: 4,
      name: "아르헨티나",
      percent: 30,
    },
    {
      id: 5,
      name: "스페인",
      percent: 12,
    },
  ],

  report: {
    probability: 81,
    averageRating: 9.2,
  },
}
];