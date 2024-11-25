export interface Recipe {
    id: number;
    name: string;
    creationDateUnix: number;
    updateDateUnix: number;
}

export interface RecipeWithDetails {
    id: number;
    name: string;
    creationDateUnix: number;
    updateDateUnix: number;
    content: string;
    ingredients: {
        id: number;
        name: string;
        quantity?: number;
        unit?: string;
    }[];
}
