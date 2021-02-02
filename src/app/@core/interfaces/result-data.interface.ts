export interface IInfoPage
{
    // pagina en la que estamos
    page: number;
    // numero de elementos por página que leeremos
    itemsPage: number;
    // numero total de elementos en la consulta
    totalItems: number;
    // numero de páginas necesarias para mostrar todos los elementos
    totalPages: number;
}

export interface IResultData
{
    listKey: string;
    definitionKey: string;
}
