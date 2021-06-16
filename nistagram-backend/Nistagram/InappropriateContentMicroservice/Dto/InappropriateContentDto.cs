using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InappropriateContentMicroservice.Dto
{
    public class InappropriateContentDto
    {
        public int Id { get; set; }
        public string ReportComment { get; set; }
        public bool Processed { get; set; }
        public bool IsPost { get; set; }
        public int SenderId { get; set; }
        public int PostId { get; set; }
        public int StoryId { get; set; }

        public InappropriateContentDto()
        {
        }
    }
}
