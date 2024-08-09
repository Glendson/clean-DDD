import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersCommentsRepository } from '@/domain/forum/application/repositories/answers-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswersCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answersComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answersComment.id,
    )

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string) {
    const InMemoryAnswerCommentsRepository = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!InMemoryAnswerCommentsRepository) return null

    return InMemoryAnswerCommentsRepository
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }
}
