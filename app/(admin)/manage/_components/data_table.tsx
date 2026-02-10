'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus } from 'lucide-react';

interface ViolenceRecord {
    id: string;
    district: string;
    parliamentarySeat: string;
    violenceDate: string;
    title: string;
    description: string;
    responsibleParty: string[];
    violenceType: string[];
    gender: string[];
    minority: string[];
    deathCount: string;
    createdAt: string;
}

export default function EditableViolenceTable() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState<ViolenceRecord[]>([]);
    const [totalPages, setTotalPages] = useState(10);

    const getViolenceRecords = async (page: number) => {
        try {
            const response = await fetch(`/api/violences?page=${page}`);
            if (!response.ok) return;
            const result = await response.json();
            setData(result.data);
            setTotalPages(10);
        } catch (err) {
            toast.error("Failed to fetch violence records. Please try again.");
        }
    };

    const handleUpdate = (id: string) => {
        redirect(`/manage/violations?id=${id}`);
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this record?")) return;

        try {
            const response = await fetch(`/api/violence?id=${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete record");
            toast.success("Record deleted successfully");
            getViolenceRecords(page);
        } catch (err) {
            toast.error("Failed to delete record. Please try again.");
        }
    }

    useEffect(() => {
        getViolenceRecords(page);
    }, [page]);

    return (
        <div>

            <Card className="w-full overflow-x-auto mt-5">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Violence Records</CardTitle>
                    <Link href="/manage/violations" className='flex flex-row items-center gap-2'><Plus className="h-5 w-5" /> Add New Record</Link>
                </CardHeader>
                <CardContent>
                    <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-gray-300 px-2 py-1">District</th>
                                <th className="border border-gray-300 px-2 py-1">Seat</th>
                                <th className="border border-gray-300 px-2 py-1">Title</th>
                                <th className="border border-gray-300 px-2 py-1">Description</th>
                                <th className="border border-gray-300 px-2 py-1">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((record) => (
                                <tr key={record.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-2 py-1 max-w-xs truncate">{record.district}</td>
                                    <td className="border border-gray-300 px-2 py-1 max-w-xs truncate">{record.parliamentarySeat}</td>
                                    <td className="border border-gray-300 px-2 py-1 max-w-sm truncate">{record.title}</td>
                                    <td className="border border-gray-300 px-2 py-1 max-w-lg truncate">{record.description}</td>
                                    <td className="border border-gray-300 px-2 py-1 flex gap-2">
                                        <button onClick={() => handleUpdate(record.id)} className="px-2 py-1 bg-blue-500 text-white rounded text-sm">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(record.id)} className="px-2 py-1 bg-red-500 text-white rounded text-sm">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-end mt-4 gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-3 py-1 bg-gray-100 rounded">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
