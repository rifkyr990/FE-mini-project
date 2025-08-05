import { useState } from "react";

export default function EventForm({ onSubmit, initialData = {}, isEditing = false }: any) {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        date: initialData?.date ? initialData.date.substring(0, 10) : "",
        capacity: initialData?.capacity || 0,
        location: initialData?.location || "",
        type: initialData?.type || "",
        banner: null,
    });

    const handleChange = (e: any) => {
        const { name, value, files } = e.target;
        if (name === "banner") {
            setFormData({ ...formData, banner: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="rounded p-6 space-y-4">
            <h2 className="text-2xl font-semibold mb-2">{isEditing ? "Edit Event" : "Buat Event Baru"}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="flex flex-col gap-3">
                    <label htmlFor="">Judul event :</label>
                    <input name="title" value={formData.title} onChange={handleChange} placeholder="Judul Event" className="input input-bordered p-3 border-1 rounded-md" />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="">Lokasi :</label>
                    <input name="location" value={formData.location} onChange={handleChange} placeholder="Lokasi" className="input input-bordered p-3 border-1 rounded-md" />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="">Tanggal event :</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="input input-bordered p-3 border-1 rounded-md" />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="">Tipe event :</label>
                    <input name="type" value={formData.type} onChange={handleChange} placeholder="Tipe Event (online/offline)" className="input input-bordered p-3 border-1 rounded-md" />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="">Kapasitas peserta :</label>
                    <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Kapasitas" className="input input-bordered p-3 border-1 rounded-md" />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="">Banner event :</label>
                    <input type="file" name="banner" onChange={handleChange} className="file-input file-input-bordered border-1 p-3" />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="">Deskripsi :</label>
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Deskripsi Event" className="textarea textarea-bordered w-full border-1 p-3 rounded-md" rows={4} />
            </div>
            <button type="submit" className="btn btn-primary bg-green-600 p-3 float-end text-gray-100 rounded-md">
                {isEditing ? "Update Event" : "Tambah Event"}
            </button>
        </form>
    );
}
