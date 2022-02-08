<?php

namespace App\Security;

use App\Entity\Parkings;
use App\Entity\Users;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;

class UserVoter extends Voter
{

    const VIEW = 'view';
    const EDIT = 'edit';

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports(string $attribute, $subject): bool
    {
        if (!in_array($attribute, [self::VIEW, self::EDIT])) {
            return false;
        }

        if (!$subject instanceof Users) {
            return false;
        }

        return true;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $currentUser = $token->getUser();

        if (!$currentUser instanceof Users) {
            return false;
        }
        // admin can edit all parkings
        if ($this->security->isGranted('ROLE_ADMIN')) {
            return true;
        }

        /** @var Users $user */
        $user = $subject;

        switch ($attribute) {
            case self::VIEW:
                return $this->canView($user, $currentUser);
            case self::EDIT:
                return $this->canEdit($user, $currentUser);
        }

        throw new \LogicException('What are you doing??');
    }

    private function canView(Users $affectedUser, Users $user): bool
    {
        if ($this->canEdit($affectedUser, $user)) {
            return true;
        }

        return false;
    }

    private function canEdit(Users $affectedUser, Users $user): bool
    {
        return $user === $affectedUser;
    }
}