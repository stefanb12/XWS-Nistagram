using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostMicroservice.Model
{
    public abstract class Document : IDocument
    {
        public ObjectId Id { get; set; }
    }
}
