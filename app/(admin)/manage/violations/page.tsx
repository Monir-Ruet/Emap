"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, AlertCircle } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { districts } from "@/constants/data";
import { DistrictToAreaMap } from "@/constants/seat";
import Link from "next/link";

const genders = ["Male", "Female"];

type FormData = {
    district: string;
    parliamentarySeat: string;
    title: string;
    description: string;
    responsibleParty: string[];
    violenceType: string[];
    minority: string[];
    gender: string;
    deathCount: number;
    violenceDate: Date;
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
    violenceType?: string;
    minority?: string;
};

export default function ViolenceForm() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const [formData, setFormData] = useState<FormData>({
        district: "",
        parliamentarySeat: "",
        title: "",
        description: "",
        responsibleParty: [""],
        violenceType: [""],
        minority: [""],
        gender: "Male",
        deathCount: 0,
        violenceDate: new Date(),
    });

    const [message, setMessage] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: keyof FormData, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleArrayChange = (field: 'responsibleParty' | 'violenceType' | 'minority', index: number, value: string) => {
        setFormData(prev => {
            const newArray = [...prev[field]];
            newArray[index] = value;
            return {
                ...prev,
                [field]: newArray
            };
        });
    };

    const addArrayItem = (field: 'responsibleParty' | 'violenceType' | 'minority') => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], ""]
        }));
    };

    const removeArrayItem = (field: 'responsibleParty' | 'violenceType' | 'minority', index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    // Validate form
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
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required";
        }

        if (!formData.gender.trim()) {
            newErrors.gender = "Gender is required";
        }

        if (formData.deathCount < 0) {
            newErrors.deathCount = "Death count cannot be negative";
        }

        if (!formData.violenceDate) {
            newErrors.violenceDate = "Violence date is required";
        }

        if (formData.responsibleParty.length === 0 || formData.responsibleParty.every(item => !item.trim())) {
            newErrors.responsibleParty = "At least one responsible party is required";
        }

        if (formData.violenceType.length === 0 || formData.violenceType.every(item => !item.trim())) {
            newErrors.violenceType = "At least one violence type is required";
        }

        if (formData.minority.length === 0 || formData.minority.every(item => !item.trim())) {
            newErrors.minority = "At least one minority group is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            alert("Please fill all required fields correctly");
            return;
        }

        setIsSubmitting(true);

        try {
            const cleanedData = {
                ...formData,
                responsibleParty: formData.responsibleParty.filter(item => item.trim() !== ""),
                violenceType: formData.violenceType.filter(item => item.trim() !== ""),
                minority: formData.minority.filter(item => item.trim() !== ""),
            };

            if (isUpdate) {
                const response = await fetch(`/api/violence?id=${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cleanedData),
                });
                if (!response.ok) {
                    setMessage("Failed to update report. Please try again.");
                } else {
                    setMessage("Report updated successfully.");
                }

                toast.success("Report updated successfully", { position: "top-center" });
                setIsSubmitting(false);
                return;
            } else {
                const response = await fetch('/api/violence', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cleanedData),
                });
                if (!response.ok) {
                    setMessage("Failed to submit report. Please try again.");
                } else {
                    setMessage("Report submitted successfully.");
                }

                toast.success(isUpdate ? "Report updated successfully" : "Report added successfully", { position: "top-center" });
            }
        } catch (error) {
            toast.error("Failed to submit report. Please try again.", { position: "top-center" });
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetch(`/api/violence?id=${id}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    setIsUpdate(true);
                    setFormData(data);
                })
                .catch(err => {
                });
        }
    }, [id]);

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 mt-10">


            <Card className="shadow-lg rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Violence Incident Report</CardTitle>
                    <p className="text-sm text-muted-foreground">All fields are required</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="district" className="flex items-center gap-1">
                                    District <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.district}
                                    onValueChange={(value) => handleInputChange("district", value)}
                                >
                                    <SelectTrigger id="district" className={errors.district ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Select district" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            districts.map((d) => (
                                                <SelectItem key={d} value={d}>{d}</SelectItem>
                                            ))
                                        }
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
                                >
                                    <SelectTrigger id="parliamentarySeat" className={errors.parliamentarySeat ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Select parliamentary seat" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            DistrictToAreaMap.get(formData.district)
                                                ?.map((_, idx) => (
                                                    <SelectItem key={idx} value={`${formData.district}-${idx + 1}`}>
                                                        {formData.district}-{idx + 1}
                                                    </SelectItem>
                                                ))
                                        }
                                    </SelectContent>
                                </Select>

                                {/* <Input
                                    id="parliamentarySeat"
                                    value={formData.parliamentarySeat}
                                    onChange={(e) => handleInputChange("parliamentarySeat", e.target.value)}
                                    placeholder="e.g. Dhaka-10"
                                    className={errors.parliamentarySeat ? "border-red-500" : ""}
                                /> */}
                                {errors.parliamentarySeat && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.parliamentarySeat}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="flex items-center gap-1">
                                Violence Date <span className="text-red-500">*</span>
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={`w-full justify-start text-left font-normal ${errors.violenceDate ? "border-red-500 text-red-500" : ""}`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {format(formData?.violenceDate, "PPP")}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={formData.violenceDate}
                                        onSelect={(date) => {
                                            if (date) {
                                                handleInputChange("violenceDate", date);
                                                if (errors.violenceDate) {
                                                    setErrors(prev => ({ ...prev, violenceDate: undefined }));
                                                }
                                            }
                                        }}
                                        initialFocus
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
                            </Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => handleInputChange("title", e.target.value)}
                                placeholder="Short incident title"
                                className={errors.title ? "border-red-500" : ""}
                                required
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
                            </Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                placeholder="Detailed description of the incident"
                                className={`min-h-30 ${errors.description ? "border-red-500" : ""}`}
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
                                <span className="text-xs text-muted-foreground ml-2">(At least one required)</span>
                            </Label>
                            <div className="space-y-3">
                                {formData.responsibleParty.map((item, index) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        <Input
                                            value={item}
                                            onChange={(e) => handleArrayChange("responsibleParty", index, e.target.value)}
                                            placeholder={`Party ${index + 1}`}
                                            className={`flex-1 ${errors.responsibleParty ? "border-red-500" : ""}`}
                                        />
                                        {formData.responsibleParty.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeArrayItem("responsibleParty", index)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => addArrayItem("responsibleParty")}>
                                    Add Party
                                </Button>
                                {errors.responsibleParty && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.responsibleParty}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Violence Type */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-1">
                                Violence Type <span className="text-red-500">*</span>
                                <span className="text-xs text-muted-foreground ml-2">(At least one required)</span>
                            </Label>
                            <div className="space-y-3">
                                {formData.violenceType.map((item, index) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        <Input
                                            value={item}
                                            onChange={(e) => handleArrayChange("violenceType", index, e.target.value)}
                                            placeholder={`Type ${index + 1}`}
                                            className={`flex-1 ${errors.violenceType ? "border-red-500" : ""}`}
                                        />
                                        {formData.violenceType.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeArrayItem("violenceType", index)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => addArrayItem("violenceType")}
                                >
                                    Add Type
                                </Button>
                                {errors.violenceType && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.violenceType}
                                    </p>
                                )}
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

                        {/* Minority */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-1">
                                Minority Group <span className="text-red-500">*</span>
                                <span className="text-xs text-muted-foreground ml-2">(At least one required)</span>
                            </Label>
                            <div className="space-y-3">
                                {formData.minority.map((item, index) => (
                                    <div key={index} className="flex gap-2 items-center">
                                        <Input
                                            value={item}
                                            onChange={(e) => handleArrayChange("minority", index, e.target.value)}
                                            placeholder={`Minority ${index + 1}`}
                                            className={`flex-1 ${errors.minority ? "border-red-500" : ""}`}
                                        />
                                        {formData.minority.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeArrayItem("minority", index)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => addArrayItem("minority")}
                                >
                                    Add Minority
                                </Button>
                                {errors.minority && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.minority}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="deathCount" className="flex items-center gap-1">
                                Death Count <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="deathCount"
                                type="text"
                                min={0}
                                value={formData.deathCount}
                                onChange={(e) => handleInputChange("deathCount", parseInt(e.target.value) || 0)}
                                className={errors.deathCount ? "border-red-500" : ""}
                            />
                            {errors.deathCount && (
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.deathCount}
                                </p>
                            )}
                        </div>

                        <div className="pt-4">
                            <Button
                                className="w-full rounded-xl"
                                type="submit"
                                disabled={isSubmitting}
                                size="lg"
                            >
                                {isSubmitting ? "Submitting..." : "Submit Report"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}