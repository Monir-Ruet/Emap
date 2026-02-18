'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronDownIcon, Delete, Edit2, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { districts } from '@/constants/data';
import { areaToUpazillaMap } from '@/constants/seat';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Button } from '@/components/ui/button';

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
    reference?: string;
    deathCount: string;
    createdAt: string;
}

const PAGE_SIZE = 20;

export default function EditableViolenceTable() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState<ViolenceRecord[]>([]);
    const [date, setDate] = useState<Date>()
    const [open, setOpen] = useState(false)
    const [totalPages, setTotalPages] = useState(0);
    const [district, setDistrict] = useState<string | null>(null);
    const [seat, setSeat] = useState<string | null>(null)

    const getViolenceRecords = async (page: number) => {
        try {
            let url = `/api/violences?page=${page}`;
            if (district)
                url = `${url}&districts=${district}`;
            if (seat)
                url = `${url}&parliamentarySeats=${seat}`;
            if (date) {
                console.log("Filtering for date:", date);
                url = `${url}&violenceDate=${date.toISOString()}`;
            }

            const response = await fetch(url);
            if (!response.ok) return;
            const result = await response.json();
            setData(result.data);
            setTotalPages(Math.ceil(result.totalCount / PAGE_SIZE));
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
    }, [page, district, seat, date]);

    return (
        <div>
            <Card className="w-full overflow-x-auto mt-20">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Violence Records</CardTitle>
                    <Link href="/manage/violations" className='flex flex-row items-center gap-2'><Plus className="h-5 w-5" /> Add New Record</Link>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-row gap-5 mb-5'>
                        <Select
                            value={district ?? ""}
                            onValueChange={(value) => {
                                setDistrict(value)
                                setSeat(null)
                                setPage(1);
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select district" />
                            </SelectTrigger>
                            <SelectContent>
                                {districts.map((d) => (
                                    <SelectItem key={d} value={d}>{d}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={seat ?? ""}
                            onValueChange={(value) => {
                                setSeat(value)
                                setDistrict(null)
                                setPage(1);
                            }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select seat" />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from(areaToUpazillaMap.keys()).map((seat) => (
                                    <SelectItem key={seat} value={seat}>{seat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant={"outline"} data-empty={!date} className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal">{date ? format(date, "PPP") : <span>Pick a date</span>}<ChevronDownIcon data-icon="inline-end" /></Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    defaultMonth={date}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setDate(date)
                                        setOpen(false)
                                    }}
                                />
                            </PopoverContent>
                        </Popover>

                        <Button variant={"outline"} onClick={() => {
                            setDate(undefined)
                            setSeat(null)
                            setDistrict(null)
                            setPage(1);
                        }}>Clear Filters</Button>

                    </div>
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
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => handleDelete(record.id)} className="px-2 py-1 bg-red-500 text-white rounded text-sm">
                                            <Delete className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {
                        (totalPages > 0) && (
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
                        )
                    }

                </CardContent>
            </Card>
        </div>
    );
}
