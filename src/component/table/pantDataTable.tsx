import React, { useMemo, useState } from 'react';
import {
    useTable,
    useSortBy,
    useGroupBy,
    Column,
    TableOptions,
    HeaderGroup,
    CellProps,
} from 'react-table';
import { UserModel } from '../../model/userModel';
import { Box } from '@mui/material';

const DataTable: React.FC<{ data: UserModel[], setData: React.Dispatch<React.SetStateAction<UserModel[]>> }> = ({ data, setData }) => {
    const [currentColumns, setCurrentColumns] = useState<Column<UserModel>[]>([
        {
            Header: 'Ranking',
            accessor: 'rank'
        },
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'Name',
            accessor: 'username',
        },
        {
            Header: 'Score',
            accessor: 'score',
        },
        {
            Header: 'Country',
            accessor: 'countryName',
        },
    ]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<UserModel>(
        {
            columns: currentColumns,
            data,
        } as TableOptions<UserModel>,
        useGroupBy,
        useSortBy,
    );

    const handleDragStart = (e: React.DragEvent, columnIndex: number) => {
        e.dataTransfer.setData('columnIndex', columnIndex.toString());
        console.log("columnIndex:", columnIndex);
    };

    const allowDrop = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDragOver = (e: React.DragEvent, columnIndex: number) => {
        e.preventDefault();
        const dragIndex = parseInt(e.dataTransfer.getData('columnIndex'), 10);
        console.log("dragIndex:", dragIndex);

        if (dragIndex !== columnIndex) {
            const newColumns = [...currentColumns];
            const [draggedColumn] = newColumns.splice(dragIndex, 1);
            newColumns.splice(columnIndex, 0, draggedColumn);
            setCurrentColumns(newColumns);
        }
    };

    const handleGroup = (e: React.MouseEvent, columnIndex: number) => {
        const key = currentColumns[columnIndex].accessor as keyof UserModel;
        if (!key) return;
        const groupedData = data.reduce<Record<string, UserModel[]>>((acc, curr) => {
            const groupKey = curr[key];
            if (groupKey) {
                (acc[groupKey] = acc[groupKey] || []).push(curr);
            }
            return acc;
        }, {});

        const flattenedData: UserModel[] = Object.values(groupedData).flat();

        setData(flattenedData);
    };

    return (
        <Box sx={{ overflowX: "auto" }}>
            <table {...getTableProps()} style={{ width: '100%', borderSpacing: '0 10px', }}>
                <thead>
                    {headerGroups.map((headerGroup: HeaderGroup<UserModel>) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, index) => (
                                <th
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragOver={allowDrop}
                                    onDrop={(e) => handleDragOver(e, index)}
                                    onClick={(e) => handleGroup(e, index)}
                                    style={{
                                        background: 'var(--datatable-header-color)',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        padding: '10px',
                                    }}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                            background: 'var(--datatable-row-color)',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Box>
    );
};

export default DataTable;
