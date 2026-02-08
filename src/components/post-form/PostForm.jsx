import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select, Error } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [error, setError] = React.useState("");
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setError("");
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    setError("Failed to update post. Please try again.");
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    } else {
                        setError("Failed to create post. Please try again.");
                    }
                } else {
                    setError("Failed to upload image. Please try again.");
                }
            }
        } catch (error) {
            setError(error.message || "An unexpected error occurred.");
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title" && !post) {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue, post]);

    return (
        <>
            {error && (
                <div className="w-full mb-4">
                    <Error message={error} onRetry={() => setError("")} />
                </div>
            )}
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap glass-panel bg-white/50 p-8 rounded-xl border border-gray-100/50">
                <div className="w-full md:w-2/3 px-2 mb-6 md:mb-0">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4 bg-white border-gray-200 text-black focus:border-blue-500"
                        {...register("title", { required: true })}
                    />
                    {errors.title && <p className="text-red-500 text-sm mb-4">Title is required</p>}

                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4 bg-white border-gray-200 text-black focus:border-blue-500"
                        {...register("slug", { required: true })}
                        readOnly={!!post}
                        onInput={(e) => {
                            if (!post) {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }
                        }}
                    />
                    {errors.slug && <p className="text-red-500 text-sm mb-4">Slug is required</p>}

                    <RTE
                        label="Content :"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                        rules={{ required: true }}
                    />
                    {errors.content && <p className="text-red-500 text-sm mb-4">Content is required</p>}
                </div>
                <div className="w-full md:w-1/3 px-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4 bg-white border-gray-200 text-black focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", {
                            required: !post,
                            validate: {
                                fileType: (value) => {
                                    if (!value || value.length === 0) return true;
                                    const file = value[0];
                                    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
                                    if (!allowedTypes.includes(file.type)) {
                                        return "Only .jpg, .jpeg, .png and .gif files are accepted";
                                    }
                                    return true;
                                }
                            }
                        })}
                    />
                    {errors.image?.type === "required" && <p className="text-red-500 text-sm mb-4">Featured Image is required</p>}
                    {errors.image?.type === "fileType" && <p className="text-red-500 text-sm mb-4">{errors.image.message}</p>}

                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getFileView(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </>
    );
}

// Here name is just a prop passed to the RTE component in <RTE name="content" ------/> 