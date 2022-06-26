import { ProfilesRepository } from '@/application/interfaces/profiles.repository'
import { Context } from '@/application/interfaces/context'
import { Profile } from '@/domain/profile'
import { z } from 'zod'
import { InvalidInputError } from '@/common/errors/invalid-input.error'

export type ProfilesServiceDeps = {
  profilesRepository: ProfilesRepository
}

const CreateProfileInput = Profile.omit({
  id: true,
})

type CreateProfileInput = z.infer<typeof CreateProfileInput>

export class ProfilesService {
  private profilesRepository: ProfilesRepository

  constructor({ profilesRepository }: ProfilesServiceDeps) {
    this.profilesRepository = profilesRepository
  }

  async createProfile(
    input: CreateProfileInput,
  ): Promise<Profile | InvalidInputError> {
    const validated = await CreateProfileInput.safeParseAsync(input)

    if (!validated.success) {
      return InvalidInputError.ofZodError(validated.error)
    }

    return this.profilesRepository.insertProfile(validated.data)
  }

  patchProfile() {}

  /**
   * Returns whether profile was successfully deleted or not
   * If not then user does not have a profile yet
   */
  deleteProfile({ currentUser }: Context): Promise<boolean> {
    return this.profilesRepository.deleteProfile(currentUser.profileId)
  }
}
