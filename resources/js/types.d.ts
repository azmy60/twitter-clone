type Tweet = {
    id: number;
    text: string;
    created_at: string;
    user: User;
    can_be_deleted: boolean;
};

type User = {
    id: number;
    name: string;
    profile_photo_url: string;
    username: string;
};
