using PostMicroservice.Model;
using PostMicroservice.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PostMicroservice.Service
{
    public class LocationService : ILocationService
    {
        private ILocationRepository _locationRepository;

        public LocationService(ILocationRepository locationRepository)
        {
            _locationRepository = locationRepository;
        }

        public async Task<Location> GetById(string id)
        {
            return await _locationRepository.GetById(id);
        }

        public async Task<IEnumerable<Location>> GetAll()
        {
            return await _locationRepository.GetAll();
        }

        public async Task<Location> Insert(Location entity)
        {
            return await _locationRepository.Insert(entity);
        }

        public async Task<Location> Update(Location entity)
        {
            await _locationRepository.Update(entity);
            return entity;
        }

        public async Task Delete(String id)
        {
            await _locationRepository.Delete(id);
        }
    }
}
