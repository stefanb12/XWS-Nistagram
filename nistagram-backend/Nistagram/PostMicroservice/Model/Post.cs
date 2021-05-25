﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace PostMicroservice.Model
{
    public class Post : Document
    {
        public List<string> ContentPaths { get; set; }
        public List<string> Tags { get; set; }
        public string Description { get; set; }
        public DateTime PublishingDate { get; set; }
        public Location Location { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Profile> Dislikes { get; set; }
        public List<Profile> Likes { get; set; }
        public List<Profile> Favorites { get; set; }
        public Profile Publisher { get; set; }

        public Post()
        {
            Id = ObjectId.GenerateNewId().ToString();
        }
    }
}
