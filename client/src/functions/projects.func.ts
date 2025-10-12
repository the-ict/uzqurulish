import { type AxiosError } from "axios";
import { axiosClient } from "../configs/api";
import type { FormData } from "../types/new-project-modal.types";
import type { IProject, IUpdateProjectPayload } from "../types/projects.types";

class ProjectsFunc {
  public async createProject(formData: FormData): Promise<AxiosError> {
    try {
      const response = await axiosClient.post("/projects", formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getProjects(): Promise<IProject[]> {
    try {
      const response = await axiosClient.get("/projects");
      return response.data.projects;
    } catch (error) {
      throw error;
    }
  }

  public async updateProject(
    id: number,
    payload: IUpdateProjectPayload
  ): Promise<IProject[]> {
    try {
      const response = await axiosClient.put("/projects/" + id, payload);
      console.log(response.data, "response data");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async deleteProject(id: number): Promise<AxiosError | boolean> {
    try {
      await axiosClient.delete("/projects/" + id);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default ProjectsFunc;
