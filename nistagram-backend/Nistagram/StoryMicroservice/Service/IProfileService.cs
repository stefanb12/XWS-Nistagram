using StoryMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Service
{
    public interface IProfileService : IService<Profile>
    {
        Task<List<ProfileStories>> GetProfileStories();
    }
}
