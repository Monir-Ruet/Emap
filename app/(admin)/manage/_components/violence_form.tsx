"use client";

import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { CalendarIcon, AlertCircle, Loader2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { districts, minorities, responsibleParties } from "@/constants/data";
import { DistrictToAreaMap } from "@/constants/seat";
import DualArraySelector from "../_components/multi_input";

const genders = ["Male", "Female"];

type FormData = {
    district: string;
    parliamentarySeat: string;
    title: string;
    description: string;
    responsibleParty: string[];
    minority: string[];
    gender: string;
    deathCount: number;
    violenceDate: Date;
    mild: string;
    moderate: string;
    extreme: string;
};

type FormErrors = {
    district?: string;
    parliamentarySeat?: string;
    title?: string;
    description?: string;
    gender?: string;
    deathCount?: string;
    violenceDate?: string;
    responsibleParty?: string;
    minority?: string;
    mild?: string;
    moderate?: string;
    extreme?: string;
};

export default function ViolenceForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');

    const [formData, setFormData] = useState<FormData>({
        district: "",
        parliamentarySeat: "",
        title: "",
        description: "",
        responsibleParty: [],
        minority: [],
        gender: "Male",
        deathCount: 0,
        mild: "",
        moderate: "",
        extreme: "",
        violenceDate: new Date(),
    });

    const [isUpdate, setIsUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    // Get available parliamentary seats based on selected district
    const getAvailableSeats = useCallback(() => {
        if (!formData.district) return [];
        const seats = DistrictToAreaMap.get(formData.district);
        return seats?.map((_, idx) => `${formData.district}-${idx + 1}`) || [];
    }, [formData.district]);

    // Reset parliamentary seat when district changes
    useEffect(() => {
        if (formData.district && !getAvailableSeats().includes(formData.parliamentarySeat)) {
            setFormData(prev => ({ ...prev, parliamentarySeat: "" }));
        }
    }, [formData.district, formData.parliamentarySeat, getAvailableSeats]);

    const handleInputChange = (field: keyof FormData, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error for this field
        setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.district.trim()) {
            newErrors.district = "District is required";
        }

        if (!formData.parliamentarySeat.trim()) {
            newErrors.parliamentarySeat = "Parliamentary seat is required";
        }

        if (!formData.title.trim()) {
            newErrors.title = "Title is required";
        } else if (formData.title.length > 100) {
            newErrors.title = "Title must be less than 100 characters";
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        } else if (formData.description.length > 1000) {
            newErrors.description = "Description must be less than 1000 characters";
        }

        if (!formData.gender.trim()) {
            newErrors.gender = "Gender is required";
        }

        if (formData.deathCount < 0) {
            newErrors.deathCount = "Death count cannot be negative";
        }

        if (!formData.violenceDate) {
            newErrors.violenceDate = "Violence date is required";
        } else if (formData.violenceDate > new Date()) {
            newErrors.violenceDate = "Violence date cannot be in the future";
        }

        if (formData.responsibleParty.length === 0 || formData.responsibleParty.every(item => !item.trim())) {
            newErrors.responsibleParty = "At least one responsible party is required";
        }

        if (formData.minority.length === 0 || formData.minority.every(item => !item.trim())) {
            newErrors.minority = "At least one minority group is required";
        }

        // Optional: Validate violence type descriptions if you want to make them required
        // if (!formData.mild.trim() && !formData.moderate.trim() && !formData.extreme.trim()) {
        //     newErrors.violenceType = "At least one violence type description is required";
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fill all required fields correctly", {
                position: "top-center",
                duration: 3000
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const cleanedData = {
                ...formData,
                responsibleParty: formData.responsibleParty.filter(item => item.trim() !== ""),
                minority: formData.minority.filter(item => item.trim() !== ""),
                deathCount: Number(formData.deathCount) || 0,
                violenceDate: formData.violenceDate.toISOString(),
            };

            const url = isUpdate ? `/api/violence?id=${id}` : '/api/violence';
            const method = isUpdate ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(cleanedData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Failed to ${isUpdate ? 'update' : 'submit'} report`);
            }

            toast.success(`Report ${isUpdate ? 'updated' : 'submitted'} successfully!`, {
                position: "top-center",
                duration: 3000
            });
        } catch (error: any) {
            console.error('Submission error:', error);
            toast.error(error.message || "An unexpected error occurred", {
                position: "top-center",
                duration: 5000
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            setIsLoading(true);
            try {
                const response = await fetch(`/api/violence?id=${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Ensure date is properly parsed
                const formattedData = {
                    ...data,
                    violenceDate: data.violenceDate ? new Date(data.violenceDate) : new Date(),
                    responsibleParty: Array.isArray(data.responsibleParty) ? data.responsibleParty : [],
                    minority: Array.isArray(data.minority) ? data.minority : [],
                    deathCount: Number(data.deathCount) || 0,
                };

                setIsUpdate(true);
                setFormData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error("Failed to load report data", {
                    position: "top-center",
                    duration: 3000
                });
                router.push('/violence-form');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, router]);

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto py-10 px-4 mt-10 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading report data...</span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 mt-10">
            <Card className="shadow-lg rounded-2xl">
                <CardHeader className="border-b">
                    <CardTitle className="text-2xl flex items-center justify-between">
                        <span>
                            {isUpdate ? 'Edit' : 'Create'} Violence Incident Report
                            {id && <span className="text-sm font-normal text-muted-foreground ml-2">(ID: {id})</span>}
                        </span>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Fields marked with <span className="text-red-500">*</span> are required
                    </p>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* District & Parliamentary Seat */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="district" className="flex items-center gap-1">
                                    District <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.district}
                                    onValueChange={(value) => handleInputChange("district", value)}
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger
                                        id="district"
                                        className={errors.district ? "border-red-500" : ""}
                                    >
                                        <SelectValue placeholder="Select district" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {districts.map((d) => (
                                            <SelectItem key={d} value={d}>{d}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.district && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.district}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="parliamentarySeat" className="flex items-center gap-1">
                                    Parliamentary Seat <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.parliamentarySeat}
                                    onValueChange={(value) => handleInputChange("parliamentarySeat", value)}
                                    disabled={isSubmitting || !formData.district}
                                >
                                    <SelectTrigger
                                        id="parliamentarySeat"
                                        className={errors.parliamentarySeat ? "border-red-500" : ""}
                                    >
                                        <SelectValue
                                            placeholder={
                                                !formData.district
                                                    ? "Select district first"
                                                    : "Select parliamentary seat"
                                            }
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getAvailableSeats().map((seat) => (
                                            <SelectItem key={seat} value={seat}>
                                                {seat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.parliamentarySeat && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.parliamentarySeat}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Violence Date */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-1">
                                Violence Date <span className="text-red-500">*</span>
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={`w-full justify-start text-left font-normal ${errors.violenceDate ? "border-red-500 text-red-500" : ""}`}
                                        disabled={isSubmitting}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.violenceDate ? format(formData.violenceDate, "PPP") : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={formData.violenceDate}
                                        onSelect={(date) => {
                                            if (date) {
                                                handleInputChange("violenceDate", date);
                                            }
                                        }}
                                        initialFocus
                                        disabled={(date) => date > new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.violenceDate && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.violenceDate}
                                </p>
                            )}
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="flex items-center gap-1">
                                Title <span className="text-red-500">*</span>
                                <span className="text-xs text-muted-foreground ml-auto">
                                    {formData.title.length}/100
                                </span>
                            </Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                placeholder="Short incident title (max 100 characters)"
                                className={errors.title ? "border-red-500" : ""}
                                disabled={isSubmitting}
                                maxLength={100}
                            />
                            {errors.title && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="flex items-center gap-1">
                                Description <span className="text-red-500">*</span>
                                <span className="text-xs text-muted-foreground ml-auto">
                                    {formData.description.length}/1000
                                </span>
                            </Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                placeholder="Detailed description of the incident (max 1000 characters)"
                                className={`min-h-32 ${errors.description ? "border-red-500" : ""}`}
                                disabled={isSubmitting}
                                maxLength={1000}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Responsible Party */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-1">
                                Responsible Party <span className="text-red-500">*</span>
                                <span className="text-xs text-muted-foreground ml-2">
                                    (At least one required)
                                </span>
                            </Label>
                            <div className="space-y-3">
                                <DualArraySelector
                                    selected={formData.responsibleParty}
                                    unselected={responsibleParties.filter(p => !formData.responsibleParty.includes(p))}
                                    onChange={(data) => setFormData(prev => ({ ...prev, responsibleParty: data }))}
                                />
                                {errors.responsibleParty && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.responsibleParty}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Violence Type Descriptions */}
                        <div className="space-y-4">
                            <Label className="text-lg font-semibold">Violence Type Descriptions</Label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="mild" className="text-amber-600 font-medium">
                                        Mild Violence
                                    </Label>
                                    <Textarea
                                        id="mild"
                                        value={formData.mild}
                                        onChange={(e) => handleInputChange("mild", e.target.value)}
                                        placeholder="Description of mild violence incidents"
                                        className="min-h-32"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="moderate" className="text-orange-600 font-medium">
                                        Moderate Violence
                                    </Label>
                                    <Textarea
                                        id="moderate"
                                        value={formData.moderate}
                                        onChange={(e) => handleInputChange("moderate", e.target.value)}
                                        placeholder="Description of moderate violence incidents"
                                        className="min-h-32"
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="extreme" className="text-red-600 font-medium">
                                        Extreme Violence
                                    </Label>
                                    <Textarea
                                        id="extreme"
                                        value={formData.extreme}
                                        onChange={(e) => handleInputChange("extreme", e.target.value)}
                                        placeholder="Description of extreme violence incidents"
                                        className="min-h-32"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Gender */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-1">
                                Gender <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.gender}
                                onValueChange={(value) => handleInputChange("gender", value)}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    {genders.map((g) => (
                                        <SelectItem key={g} value={g}>{g}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.gender && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.gender}
                                </p>
                            )}
                        </div>

                        {/* Minority Group */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-1">
                                Minority Group <span className="text-red-500">*</span>
                                <span className="text-xs text-muted-foreground ml-2">
                                    (At least one required)
                                </span>
                            </Label>
                            <div className="space-y-3">
                                <DualArraySelector
                                    selected={formData.minority}
                                    unselected={minorities.filter(p => !formData.minority.includes(p))}
                                    onChange={(data) => setFormData(prev => ({ ...prev, minority: data }))}
                                />
                                {errors.minority && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.minority}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Death Count */}
                        <div className="space-y-2">
                            <Label htmlFor="deathCount" className="flex items-center gap-1">
                                Death Count
                            </Label>
                            <Input
                                id="deathCount"
                                type="number"
                                min={0}
                                max={1000}
                                step={1}
                                value={formData.deathCount || ''}
                                onChange={(e) => handleInputChange("deathCount", e.target.value === '' ? 0 : parseInt(e.target.value))}
                                className={errors.deathCount ? "border-red-500" : ""}
                                disabled={isSubmitting}
                            />
                            {errors.deathCount && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.deathCount}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6 border-t">
                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.back()}
                                    disabled={isSubmitting}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 rounded-xl"
                                    type="submit"
                                    disabled={isSubmitting}
                                    size="lg"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {isUpdate ? 'Updating...' : 'Submitting...'}
                                        </>
                                    ) : (
                                        `${isUpdate ? 'Update' : 'Submit'} Report`
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}