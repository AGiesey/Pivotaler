using NUnit.Framework;
using Infrastructure.Burndown;
using Infrastructure.Models;
using static Infrastructure.Burndown.DatapointService;

namespace Test.Infrastructure.Tests.Burndown
{
  [TestFixture]
  public class DatapointServiceTests
  {

    [Test]
    public void MakeDatapoint_Works() 
    {
      const double x = (double) 15;
      const double y = (double) 15;
      var expected = new Datapoint {
        X = x,
        Y = y
      };

      var result = MakeDatapoint(x, y);

      Assert.AreEqual(expected.X, result.X);
      Assert.AreEqual(expected.Y, result.Y);
    }
  }
}