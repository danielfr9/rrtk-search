type filterOption = {
  title: string;
  min: number | null;
  max: number | null;
};

type kanjiData = {
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
};

type noKanji = {
  [key: string]: string;
};
