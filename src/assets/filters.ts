// FIXME: This looks unnecessary, but it is used in the app. We should refactor this to use a more generic approach.
export const PredefinedOptions = {
  ALL: "All",
  PRIMITIVES: "Primitives",
} as const;

export type FilterOption = {
  title: (typeof PredefinedOptions)[keyof typeof PredefinedOptions] | string;
  min: number | null;
  max: number | null;
};

export const filters: FilterOption[] = [
  {
    title: "All",
    min: 1,
    max: null,
  },
  {
    title: "Primitives",
    min: null,
    max: null,
  },
  {
    title: "1-500",
    min: 1,
    max: 500,
  },
  {
    title: "501-1000",
    min: 501,
    max: 1000,
  },
  {
    title: "1001-1500",
    min: 1001,
    max: 1500,
  },
  {
    title: "1501-2000",
    min: 1501,
    max: 2000,
  },
  {
    title: "2001+",
    min: 2001,
    max: null,
  },
];
