using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Model
{
    public class CampaignCommercial
    {
        public int CommercialId { get; set; }
        public virtual Commercial Commercial { get; set; }
        public int CampaignId { get; set; }
        public virtual Campaign Campaign { get; set; }

        public CampaignCommercial()
        {
        }
    }
}
