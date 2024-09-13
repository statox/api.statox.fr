export type ELKFixture = {
    [index: string]: {
        '@timestamp': number;
        document: Record<string, string | number | boolean | null>;
    }[];
};
