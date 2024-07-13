// components/LeaderboardSelect.tsx
import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { LeaderboardList } from './LeaderboardList';

const teams = ['Marketing', 'Security', 'Development'];
const durations = ['Daily', 'Weekly', 'Monthly'];

const LeaderboardSelect = () => {
    const [team, setTeam] = useState<string>('Marketing');
    const [duration, setDuration] = useState<string>('Weekly');

    const handleTeamChange = (event: SelectChangeEvent<string>) => {
        setTeam(event.target.value as string);
    };

    const handleDurationChange = (event: SelectChangeEvent<string>) => {
        setDuration(event.target.value as string);
    };

    /* return (
        <div className="flex flex-row w-full gap-5">
            <FormControl className='w-3/5'>
                <InputLabel id="team-select-label">Rank by Team</InputLabel>
                <Select
                    labelId="team-select-label"
                    id="team-select"
                    value={team}
                    label="Rank by Team"
                    onChange={handleTeamChange}
                >
                    {teams.map((teamName) => (
                        <MenuItem key={teamName} value={teamName}>
                            {teamName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className='w-2/5'>
                <InputLabel id="duration-select-label">Duration</InputLabel>
                <Select
                    labelId="duration-select-label"
                    id="duration-select"
                    value={duration}
                    label="Duration"
                    onChange={handleDurationChange}
                >
                    {durations.map((durationPeriod) => (
                        <MenuItem key={durationPeriod} value={durationPeriod}>
                            {durationPeriod}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    ); */

    return (
        <Box className='w-full' marginTop={2}>
            <Box display="flex" gap={2}>
                <FormControl fullWidth>
                    <InputLabel id="team-select-label">Team</InputLabel>
                    <Select
                        labelId="team-select-label"
                        id="team-select"
                        value={team}
                        label="Team"
                        onChange={handleTeamChange}
                    >
                        {teams.map((teamName) => (
                            <MenuItem key={teamName} value={teamName}>
                                {teamName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="duration-select-label">Duration</InputLabel>
                    <Select
                        labelId="duration-select-label"
                        id="duration-select"
                        value={duration}
                        label="Duration"
                        onChange={handleDurationChange}
                    >
                        {durations.map((durationPeriod) => (
                            <MenuItem key={durationPeriod} value={durationPeriod}>
                                {durationPeriod}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {team && duration && <LeaderboardList team={team} duration={duration} />}
        </Box>
    );
};

export default LeaderboardSelect;