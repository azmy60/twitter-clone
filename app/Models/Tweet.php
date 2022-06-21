<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Tweet extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['can_be_deleted'];

    protected $with = [
        'user:id,name,username,profile_photo_url',
        'parentTweet'
    ];

    public static function all($columns = ['*'])
    {
        return static::orderBy('created_at', 'desc')->get($columns);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function parentTweet()
    {
        return $this->belongsTo(Tweet::class, 'parent_tweet_id');
    }

    public function replies()
    {
        return $this->hasMany(Tweet::class, 'parent_tweet_id');
    }

    protected function canBeDeleted(): Attribute
    {
        return Attribute::make(
            get: fn () => Auth::hasUser() && Auth::user()->can('delete', $this)
        );
    }
}
