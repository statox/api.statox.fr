export type TableCheck = {
    [column: string]:
        | string
        | number
        | boolean
        | null
        | { aroundTimestamp: string; precision: string }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        | ((value: any) => boolean);
};

export type MysqlCheckData = {
    [table: string]: TableCheck[];
};
