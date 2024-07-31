import { File } from 'formidable';
import { db2, isSQLError } from '../../databases/db';
import { ItemAlreadyExistsError } from './errors';

interface AddReadingListItemParamsBase {
    name: string;
    tags: string[];
    isPublic: boolean;
}

interface AddReadingListItemParamsLink extends AddReadingListItemParamsBase {
    link: string;
}

interface AddReadingListItemParamsDocument extends AddReadingListItemParamsBase {
    document: File;
}

const isDocumentItemParams = (
    newItem: AddReadingListItemParamsLink | AddReadingListItemParamsDocument
): newItem is AddReadingListItemParamsDocument => {
    return (newItem as AddReadingListItemParamsDocument).document !== undefined;
};

export const createReadingListItem = async (
    newItem: AddReadingListItemParamsLink | AddReadingListItemParamsDocument
) => {
    if (isDocumentItemParams(newItem)) {
        // TODO create S3 object
        return;
    }

    await addReadingListItem(newItem);
};

export const addReadingListItem = async (newItem: AddReadingListItemParamsLink) => {
    const { name, link, isPublic, tags } = newItem;
    try {
        await db2.run(
            'INSERT INTO ReadingList (name, link, isPublic, isDocument, tags, creationDateUnix) VALUES (?, ?, ?, ?, ?, unixepoch())',
            [name, link, isPublic, false, JSON.stringify(tags)]
        );
    } catch (error: unknown) {
        if (
            isSQLError(error) &&
            error.code === 'SQLITE_CONSTRAINT' &&
            error.message === 'SQLITE_CONSTRAINT: UNIQUE constraint failed: ReadingList.link'
        ) {
            throw new ItemAlreadyExistsError();
        }
        throw error;
    }
};

interface ReadingListItemDB {
    id: number;
    name: string;
    link: string;
    tagsStr: string;
    creationDateUnix: number;
    isPublic: number;
    isDocument: number;
}

export const getAllReadingListItems = async () => {
    const res = await db2.all<ReadingListItemDB>(`SELECT
        id,
        name,
        link,
        tags as tagsStr,
        creationDateUnix,
        isPublic,
        isDocument
        FROM ReadingList
    `);

    return res.map((row) => {
        return {
            id: row.id,
            name: row.name,
            link: row.link,
            creationDateUnix: row.creationDateUnix,
            tags: JSON.parse(row.tagsStr),
            isPublic: row.isPublic === 1,
            isDocument: row.isDocument === 1
        };
    });
};
