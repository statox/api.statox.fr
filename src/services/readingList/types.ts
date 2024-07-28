export type ReadingListItem = {
    id: number;
    name: string;
    link: string;
    creationDateUnix: number;
    isPublic: boolean;
    isDocument: boolean; // true: s3 link to a doc, false: just a link to internet
};
