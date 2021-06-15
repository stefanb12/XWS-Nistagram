using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Model
{
    public class PostFavorite
    {
        public int PostId { get; set; }
        public virtual Post Post { get; set; }
        public int FavoriteId { get; set; }
        public virtual Profile Favorite { get; set; }

        public PostFavorite() { }
    }
}
