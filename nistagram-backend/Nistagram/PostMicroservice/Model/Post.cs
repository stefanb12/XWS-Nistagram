using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace PostMicroservice.Model
{
    public class Post
    {
        public int Id { get; set; }
        public virtual List<Tag> Tags { get; set; }
        public string Description { get; set; }
        public DateTime PublishingDate { get; set; }
        public int LocationId { get; set; }
        public virtual Location Location { get; set; }
        public int PublisherId { get; set; }
        public virtual Profile Publisher { get; set; }
        public virtual List<Comment> Comments { get; set; }
        public virtual List<PostDislike> Dislikes { get; set; }
        public virtual List<PostLike> Likes { get; set; }
        public virtual List<PostFavorite> Favorites { get; set; }
        public virtual List<Content> Contents { get; set; }
        public bool Deleted { get; set; }

        public Post()
        {
        }
    }
}
