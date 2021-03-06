import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { editProject, fetchProjectDetail } from '../actions/index'
import { useParams, useHistory } from 'react-router-dom'

const EditProjectForm = ({ project, fetchProjectDetail, editProject, isLoading }) => {
    const history = useHistory()
    const initialFormValues ={
        project_name: project.project_name,
        project_description: project.project_description,
        project_goal: project.project_goal,
        id:project.id
    }
    const { id } = useParams()
    const [formValues, setFormValues] = useState(initialFormValues)
    const onSubmit = (e) => {
        e.preventDefault()
        editProject(formValues)
        history.push(`/dashboard`)
    }
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        fetchProjectDetail(id)
    }, [fetchProjectDetail, id])

    return (
        <div>
            {isLoading ? (
                'loading...'
            ) : (
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    name='project_name'
                    value={formValues.project_name}
                    onChange={handleChange}
                    placeholder='Project Name'
                />
                <input
                    type='text'
                    name='project_description'
                    value={formValues.project_description}
                    onChange={handleChange}
                    placeholder='Description of your project'
                />
                <input
                    type='integer'
                    name='project_goal'
                    value={formValues.project_goal}
                    onChange={handleChange}
                    placeholder='Whats your goal?'
                />
                <button>Submit</button>
            </form>
            )}
        </div>
    )
}
const mapStateToProps = (state) => {
    console.log(state.project)
    return {
        project:state.project,
        isLoading:state.isLoading
    }
}

export default connect(mapStateToProps, { editProject, fetchProjectDetail })(EditProjectForm)
