import React, { useState, useEffect } from 'react';
import { getSprintBacklogStories } from '../sprint/sprintApiService';
import { makeStyles } from '@material-ui/core';
import { SprintHeader } from './SprintHeader';
import { SprintBody } from './SprintBody';
import { SidebarPageLayout } from '../layout/SidebarPageLayout';

const teams = [
  {name: 'All', id: -1},
  {name: 'Dev-Ops', id: 1},
  {name: 'FDOT', id: 2},
  {name: 'MDOT', id: 3},
  {name: 'Support', id: 4},
  {name: 'TFMS', id: 5},
  {name: 'UX', id: 6},
]

const users = [
  { name: 'Mackenzie McCracken', teamId: 1, searchId: 'mm' },
  { name: 'Josh Esbrook', teamId: 2, searchId: 'jje' },
  { name: 'Rod Lambert', teamId: 2, searchId: 'ro' },
  { name: 'Anthony Woronec', teamId: 3, searchId: 'afw' },
  { name: 'Brian Hare', teamId: 3, searchId: 'bh' },
  { name: 'Dave Sweeton', teamId: 3, searchId: 'ds' },
  { name: 'Mark Ferrall', teamId: 3, searchId: 'mdf' },
  { name: 'Mark Fleming', teamId: 3, searchId: 'maf' },
  { name: 'Michael Marsh', teamId: 3, searchId: 'msm' },
  { name: 'Sushma Rao', teamId: 3, searchId: 'srr' },
  { name: 'Brian Rodgers', teamId: 4, searchId: 'ber' },
  { name: 'Stephen Wehmeyer', teamId: 4, searchId: 'ssw' },
  { name: 'Steve Willaert', teamId: 4, searchId: 'smw' },
  { name: 'Adam Giesey', teamId: 5, searchId: 'as' },
  { name: 'Connor Robinson', teamId: 5, searchId: 'clr' },
  { name: 'Matt Ritter', teamId: 6, searchId: 'mr' },
]

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  pageHeader: {
    height: '8em',
    flexShrink: 0,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  pageBody: {
    flexGrow: 1,
    display: 'flex',
    padding: theme.spacing(1)
  },
}));

export const SprintPage = () => {
  const classes = useStyles();
  const [currentTeam, setCurrentTeam] = useState(teams[0]);
  const [currentOwner, setCurrentOwner] = useState();
  const [filteredOwners, setFilteredOwners] = useState(users);
  const [backlogStories, setBacklogStories] = useState();

  /* CURRENT TEAM */
  useEffect(() => {
    if (currentTeam === teams[0]) {
      setFilteredOwners(users);
      return;
    }

    setFilteredOwners(users.filter(x => x.teamId === currentTeam.id));
  }, [currentTeam]);

  /* FILTERED OWNERS */
  useEffect(() => {
    setCurrentOwner(filteredOwners[0]);
  }, [filteredOwners])

  /* CURRENT OWNER */
  useEffect(() => {
    if (!currentOwner)
      return;

    getSprintBacklogStories(currentOwner.searchId)
      .then(x => setBacklogStories(x));

  }, [currentOwner])

  const selectTeam = (teamId: number) => {
    var selectedOption = teams.find(x => x.id === teamId);

    if (!selectedOption) {
      setCurrentTeam(teams[0]);
    } else {
      
      setCurrentTeam(selectedOption);
    }
  }

  const selectOwner = (ownerSearchId: string) => {
    let selectedOwner = users.find(x => x.searchId === ownerSearchId);

    if (selectedOwner) {
      setCurrentOwner(selectedOwner);
    }
  }

  return (
    <SidebarPageLayout>
      <div className={classes.root}>
        <div className={classes.pageHeader}>
          <SprintHeader 
            teamOptions={teams}
            ownerOptions={filteredOwners}
            selectedOwnerSearchId={currentOwner ? currentOwner.searchId : users[0].searchId}
            selectedTeamId={currentTeam ? currentTeam.id : teams[0].id} 
            onSelectTeam={selectTeam}
            onSelectOwner={selectOwner}
          />
        </div>
        <div className={classes.pageBody}>
          <SprintBody stories={backlogStories}/>
        </div>
      </div>
    </SidebarPageLayout>
  )
}