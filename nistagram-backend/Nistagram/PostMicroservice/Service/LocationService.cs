using PostMicroservice.Model;
using PostMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Service
{
    public class LocationService : ILocationService
    {
        public ILocationRepository LocationRepository;

        public LocationService(ILocationRepository locationRepository)
        {
            LocationRepository = locationRepository;
        }

        public async Task<Location> GetById(string id)
        {
            return await LocationRepository.GetById(id);
        }

        public async Task<IEnumerable<Location>> GetAll()
        {
            return await LocationRepository.GetAll();
        }

        public async Task<Location> Insert(Location entity)
        {
            return await LocationRepository.Insert(entity);
        }

        public async Task<Location> Update(Location entity)
        {
            await LocationRepository.Update(entity);
            return entity;
        }

        public async Task Delete(String id)
        {
            await LocationRepository.Delete(id);
        }
    }
}
