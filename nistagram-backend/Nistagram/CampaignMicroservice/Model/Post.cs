using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CampaignMicroservice.Model
{
    public class Post
    {
        public int Id { get; set; }
        public int OriginalId { get; set; }

        public Post()
        {
        }
    }
}
