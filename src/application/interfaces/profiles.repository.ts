import { Profile } from '@/domain/profile'

export interface ProfilesRepository {
  insertProfile(profile: Omit<Profile, 'id'>): Promise<Profile>
  patchProfile(id: Profile['id'], profile: Omit<Profile, 'id'>): Promise<void>
  deleteProfile(id: Profile['id']): Promise<boolean>
}
