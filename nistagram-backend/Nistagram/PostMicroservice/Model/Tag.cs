using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Model
{
    public class Tag
    {
        public int Id { get; set; }
        public String Content { get; set; }
        public int PostId { get; set; }
        public virtual Post Post { get; set; }

        public Tag() { }
    }
}
