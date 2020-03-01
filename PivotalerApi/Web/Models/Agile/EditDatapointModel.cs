using System;

namespace Web.Models
{
  public class EditDatapointModel
  {
    public DateTime DateTime { get; set; }
    public int? RemainingPoints { get; set; }
    public int? RemainingEverhourPoints { get; set; }
  }
}