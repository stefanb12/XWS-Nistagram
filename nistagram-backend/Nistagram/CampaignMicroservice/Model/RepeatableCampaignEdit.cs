using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CampaignMicroservice.Model
{
    public class RepeatableCampaignEdit
    {
        public int Id { get; set; }
        public int CampaignId { get; set; }
        public virtual Campaign Campaign { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int NumberOfRepeats { get; set; }
        public DateTime ModificationDate { get; set; }

        public RepeatableCampaignEdit()
        {
        }
    }
}
