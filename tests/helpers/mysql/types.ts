// Allow functions with void so that we can use chai's assert in the checkers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ColumnCheckFunction = (value: any) => boolean;

export type TableCheck = {
    [column: string]:
        | string
        | number
        | boolean
        | null
        | { aroundTimestamp: string; precision: string }
        | ColumnCheckFunction;
};

export type MysqlCheckData = {
    [table: string]: TableCheck[];
};

export type MysqlFixture = {
    [table: string]: { [column: string]: string | number | boolean | null }[];
};
