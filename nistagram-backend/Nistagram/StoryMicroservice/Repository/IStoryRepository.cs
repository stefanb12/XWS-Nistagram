﻿using StoryMicroservice.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StoryMicroservice.Repository
{
    public interface IStoryRepository : IRepository<Story>
    {
        public Task<List<StoryProfile>> GetAggregatedCollection();
    }
}
