<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;

class RegistrationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder

        ->add('nom',TextType::class, [
            'label' => false
        ])
        ->add('prenom',TextType::class, [
            'label' => false
        ])
        ->add('email',EmailType::class, [
            'label' => false
        ])
        ->add('password', RepeatedType::class, [
            'type' => PasswordType::class,
            'invalid_message' => 'The password and the confirmation must be identical.',
            'required' => true,
            'first_options' => [
                'label' => 'Password',
                'attr' => [
                    'class' => 'form-control',
                ],
            ],
            'second_options' => [
                'label' => 'Confirm your password',
                'attr' => [
                    'class' => 'form-control',
                ],
            ],
        ])
        ->add('dateanniv', DateType::class, [
            'widget' => 'single_text',
            'label' => 'Date de naissance',
            'attr' => ['class' => 'form-control'],
            'label_attr' => ['class' => 'form-label'],
        ]);
      

    }


    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
