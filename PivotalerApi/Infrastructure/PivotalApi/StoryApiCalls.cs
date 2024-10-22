using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using Infrastructure.PivotalApi.Models;

namespace Infrastructure.PivotalApi
{
  public class StoryApiCalls : IStoryApiCalls
  {
    private readonly HttpClient client;
    private readonly JsonService jsonService;
    const string PivotalApiV5BaseUri = "https://www.pivotaltracker.com/services/v5";
    const string PaulsPivotalApiKey = "de3c3f98865f45ba9be2207777392782";
    const string PivotalKeyHeader = "X-TrackerToken";
    public StoryApiCalls()
    {
      client = new HttpClient();
      jsonService = new JsonService();
    }

    public async Task<IEnumerable<PivotalStory>> GetSprintBacklogStories(string user)
    {
      var projectId = 836745;

      var builder = new UriBuilder($"{PivotalApiV5BaseUri}/projects/{projectId}/stories");
      builder.Port = -1;

      var query = HttpUtility.ParseQueryString(builder.Query);
      query["filter"] = $"owner:{user} and labels:\"sprint backlog\"";

      builder.Query = query.ToString();

      using(var client = new HttpClient())
      {
          client.DefaultRequestHeaders.Add(PivotalKeyHeader, PaulsPivotalApiKey);
          
          var result = await client.GetStringAsync(builder.ToString());
          
          return jsonService.JsonStringToObject<IEnumerable<PivotalStory>>(result);
      }

    }

    public async Task<PivotalSearchResult> Search(string user)
    {
      var projectId = 836745;

      var builder = new UriBuilder($"{PivotalApiV5BaseUri}/projects/{projectId}/search");
      builder.Port = -1;

      var query = HttpUtility.ParseQueryString(builder.Query);
      query["query"] = $"owner:{user} AND labels:\"sprint backlog\" AND -state:unscheduled";

      builder.Query = query.ToString();

      var requestUrl = builder.ToString();

      using(var client = new HttpClient())
      {
          client.DefaultRequestHeaders.Add(PivotalKeyHeader, PaulsPivotalApiKey);
          
          var result = await client.GetStringAsync(requestUrl);
          
          return jsonService.JsonStringToObject<PivotalSearchResult>(result);
      }

    }

    public async Task<PivotalStory> GetStoryById(int id)
    {
      var projectId = 836745;

      var builder = new UriBuilder($"{PivotalApiV5BaseUri}/projects/{projectId}/stories/{id}");
      builder.Port = -1;

      using(var client = new HttpClient())
      {
          client.DefaultRequestHeaders.Add(PivotalKeyHeader, PaulsPivotalApiKey);

          var result = await client.GetStringAsync(builder.ToString());
          
          var story = jsonService.JsonStringToObject<PivotalStory>(result);
          
          return story;
      }
    }
  }

  public interface IStoryApiCalls
  {
    Task<IEnumerable<PivotalStory>> GetSprintBacklogStories(string user);
    Task<PivotalSearchResult> Search(string user);
    Task<PivotalStory> GetStoryById(int id);
  }
}