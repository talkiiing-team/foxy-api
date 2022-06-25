import { ProfilesRepository } from '@/application/interfaces/profiles.repository'
import { Context } from '@/application/interfaces/context'

export class ProfilesService {
  private profilesRepository!: ProfilesRepository

  createProfile() {}

  patchProfile() {}

  deleteProfile(context: Context) {
    this.profilesRepository.deleteProfile(context.currentUser.profileId)
  }
}
