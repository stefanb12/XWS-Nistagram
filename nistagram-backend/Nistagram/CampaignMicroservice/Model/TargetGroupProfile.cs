using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Model
{
    public class TargetGroupProfile
    {
        public int ProfileId { get; set; }
        public virtual Profile Profile { get; set; }
        public int CampaignId { get; set; }
        public virtual Campaign Campaign { get; set; }

        public TargetGroupProfile() { }
    }
}
