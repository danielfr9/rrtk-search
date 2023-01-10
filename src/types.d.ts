interface Kanji {
  heisig_number: string | null;
  kanji: string | null;
  keywords: {
    primary: string;
    secondary: string[];
  };
  description: null | {
    has_image: boolean;
    info: string;
  };
  onyomi?: string[];
  kunyomi?: string[];
  stroke_count?: number | null;
  jlpt?: number | null;
  grade?: number | null;
}

interface Kanjiapi_Kanji {
  kanji: string;
  grade: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 9 | 10 | null;
  stroke_count: number;
  meanings: string[];
  kun_readings: string[];
  on_readings: string[];
  name_readings: string[];
  jlpt: 1 | 2 | 3 | 4 | null;
  unicode: string;
  heisig_en: string | null;
}

interface Kanjiapi_Reading {
  reading: string;
  main_kanji: string[];
  name_kanji: string[];
}

interface Kanjiapi_Word {
  meanings: IMeaning[];
  variants: IVariant[];
}

interface Kanjiapi_Meaning {
  glosses: string[];
}

interface Kanjiapi_Variant {
  written: string;
  pronounced: string;
  priorities: string[];
}
